import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { nanoid } from "nanoid";
import { env } from "../env.js";
import { menus, scans } from "../store.js";
import type { DietaryProfile, Menu, MenuItem, Scan } from "../types.js";
import { parseMenuImageWithGemini } from "./gemini.service.js";

export async function ensureDataDirs() {
  await fs.mkdir(env.uploadsDir, { recursive: true });
  await fs.mkdir(env.receiptsDir, { recursive: true });
}

export async function createMenuScan(input: {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  targetLanguage: string;
  countryCode?: string;
  dietaryProfile?: DietaryProfile;
}) {
  await ensureDataDirs();
  const scanId = `scan_${nanoid(10)}`;
  const ext = path.extname(input.filename) || ".jpg";
  const imagePath = path.join(env.uploadsDir, `${scanId}${ext}`);
  const normalized = await sharp(input.buffer).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 86 }).toBuffer();
  await fs.writeFile(imagePath, normalized);
  const metadata = await sharp(normalized).metadata();
  const imageUrl = `/files/uploads/${path.basename(imagePath)}`;

  const scan: Scan = {
    id: scanId,
    status: "processing",
    menuId: null,
    imageUrl,
    createdAt: new Date().toISOString()
  };
  scans.set(scanId, scan);

  try {
    const parsed = await parseMenuImageWithGemini({
      imageBase64: normalized.toString("base64"),
      mimeType: "image/jpeg",
      targetLanguage: input.targetLanguage,
      countryCode: input.countryCode,
      dietaryProfile: input.dietaryProfile
    });

    const menuId = `menu_${nanoid(10)}`;
    const items: MenuItem[] = parsed.sections.flatMap((section) =>
      section.items.map((item) => ({
        id: item.id || `item_${nanoid(8)}`,
        sectionId: section.id,
        sectionName: section.chinese_name ?? section.source_name,
        sourceName: item.source_name,
        chineseName: item.chinese_name,
        descriptionZh: item.description_zh,
        price: item.price,
        priceText: item.price_text,
        ingredientsGuess: item.ingredients_guess,
        allergensGuess: item.allergens_guess,
        dietaryFlags: item.dietary_flags,
        spicyLevel: item.spicy_level,
        confidence: item.confidence,
        bbox2d: item.bbox_2d,
        bboxConfidence: item.bbox_confidence
      }))
    );

    const menu: Menu = {
      id: menuId,
      scanId,
      title: parsed.title,
      menuLanguage: parsed.menu_language,
      targetLanguage: parsed.target_language,
      currency: parsed.currency,
      imageUrl,
      imagePath,
      imageWidth: metadata.width ?? 1,
      imageHeight: metadata.height ?? 1,
      items,
      warnings: parsed.warnings,
      createdAt: new Date().toISOString()
    };

    menus.set(menuId, menu);
    scans.set(scanId, { ...scan, status: "completed", menuId });
    return { scanId, status: "completed", menuId };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown scan error";
    scans.set(scanId, { ...scan, status: "failed", errorMessage: message });
    return { scanId, status: "failed", menuId: null, errorMessage: message };
  }
}
