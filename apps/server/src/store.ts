import type { Menu, Receipt, Room, Scan } from "./types.js";

export const scans = new Map<string, Scan>();
export const menus = new Map<string, Menu>();
export const rooms = new Map<string, Room>();
export const receipts = new Map<string, Receipt>();

export function findRoomByJoinCode(joinCode: string): Room | undefined {
  const normalized = joinCode.trim().toUpperCase();
  return [...rooms.values()].find((room) => room.joinCode === normalized);
}
