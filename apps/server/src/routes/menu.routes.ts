import type { FastifyInstance } from "fastify";
import { dietaryProfileSchema } from "../schemas/menu.schema.js";
import { menus, scans } from "../store.js";
import { createMenuScan } from "../services/menu.service.js";

export async function menuRoutes(app: FastifyInstance) {
  app.post("/api/menu/scans", async (request, reply) => {
    let image: { buffer: Buffer; filename: string; mimetype: string } | null = null;
    const fields: Record<string, string> = {};
    for await (const part of request.parts()) {
      if (part.type === "file") {
        image = {
          buffer: await part.toBuffer(),
          filename: part.filename,
          mimetype: part.mimetype
        };
      } else {
        fields[part.fieldname] = String(part.value ?? "");
      }
    }
    if (!image) return reply.code(400).send({ error: "image is required" });
    const parseString = (key: string, fallback = "") => fields[key] ?? fallback;
    const profileRaw = parseString("dietaryProfile", "{}");
    const dietaryProfile = dietaryProfileSchema.parse(JSON.parse(profileRaw || "{}"));
    const result = await createMenuScan({
      buffer: image.buffer,
      filename: image.filename,
      mimeType: image.mimetype,
      targetLanguage: parseString("targetLanguage", "zh-CN"),
      countryCode: parseString("countryCode", ""),
      dietaryProfile
    });
    return reply.send(result);
  });

  app.get("/api/menu/scans/:scanId", async (request, reply) => {
    const { scanId } = request.params as { scanId: string };
    const scan = scans.get(scanId);
    if (!scan) return reply.code(404).send({ error: "scan not found" });
    return reply.send(scan);
  });

  app.get("/api/menus/:menuId", async (request, reply) => {
    const { menuId } = request.params as { menuId: string };
    const menu = menus.get(menuId);
    if (!menu) return reply.code(404).send({ error: "menu not found" });
    return reply.send(menu);
  });

  app.patch("/api/menus/:menuId/items/:itemId", async (request, reply) => {
    const { menuId, itemId } = request.params as { menuId: string; itemId: string };
    const menu = menus.get(menuId);
    if (!menu) return reply.code(404).send({ error: "menu not found" });
    const body = request.body as Partial<{ chineseName: string; descriptionZh: string; priceText: string }>;
    menu.items = menu.items.map((item) => item.id === itemId ? { ...item, ...body } : item);
    menus.set(menuId, menu);
    return reply.send(menu.items.find((item) => item.id === itemId));
  });
}
