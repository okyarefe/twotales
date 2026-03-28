import { describe, it, expect } from "vitest";
import { webhookHasMeta, webhookHasData } from "@/lib/typeguards";

describe("webhookHasMeta", () => {
  it("returns true for valid webhook meta structure", () => {
    const data = {
      meta: {
        event_name: "order_created",
        custom_data: { user_id: "user-123" },
      },
    };
    expect(webhookHasMeta(data)).toBe(true);
  });

  it("returns false for null", () => {
    expect(webhookHasMeta(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(webhookHasMeta(undefined)).toBe(false);
  });

  it("returns false for primitive values", () => {
    expect(webhookHasMeta("string")).toBe(false);
    expect(webhookHasMeta(42)).toBe(false);
    expect(webhookHasMeta(true)).toBe(false);
  });

  it("returns false when meta is missing", () => {
    expect(webhookHasMeta({ other: "data" })).toBe(false);
  });

  it("returns false when meta is null", () => {
    expect(webhookHasMeta({ meta: null })).toBe(false);
  });

  it("returns false when meta is not an object", () => {
    expect(webhookHasMeta({ meta: "string" })).toBe(false);
  });

  it("returns false when event_name is missing from meta", () => {
    const data = {
      meta: { custom_data: { user_id: "user-123" } },
    };
    expect(webhookHasMeta(data)).toBe(false);
  });

  it("returns false when event_name is not a string", () => {
    const data = {
      meta: { event_name: 123, custom_data: { user_id: "user-123" } },
    };
    expect(webhookHasMeta(data)).toBe(false);
  });

  it("returns false when custom_data is missing from meta", () => {
    const data = {
      meta: { event_name: "order_created" },
    };
    expect(webhookHasMeta(data)).toBe(false);
  });

  it("returns true with additional properties on the object", () => {
    const data = {
      meta: {
        event_name: "subscription_created",
        custom_data: { user_id: "user-456" },
      },
      extra: "field",
    };
    expect(webhookHasMeta(data)).toBe(true);
  });
});

describe("webhookHasData", () => {
  it("returns true for valid webhook data structure", () => {
    const data = {
      data: {
        id: "order-1",
        attributes: { status: "paid" },
      },
    };
    expect(webhookHasData(data)).toBe(true);
  });

  it("returns false for null", () => {
    expect(webhookHasData(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(webhookHasData(undefined)).toBe(false);
  });

  it("returns false for primitive values", () => {
    expect(webhookHasData("string")).toBe(false);
    expect(webhookHasData(42)).toBe(false);
  });

  it("returns false when data property is missing", () => {
    expect(webhookHasData({ other: "value" })).toBe(false);
  });

  it("returns false when data is null", () => {
    expect(webhookHasData({ data: null })).toBe(false);
  });

  it("returns false when data is not an object", () => {
    expect(webhookHasData({ data: "string" })).toBe(false);
  });

  it("returns false when attributes is missing from data", () => {
    expect(webhookHasData({ data: { id: "1" } })).toBe(false);
  });

  it("returns true with additional properties", () => {
    const data = {
      data: {
        id: "order-1",
        attributes: { status: "paid" },
        relationships: {},
      },
      meta: { some: "info" },
    };
    expect(webhookHasData(data)).toBe(true);
  });

  it("returns true even with empty attributes", () => {
    const data = {
      data: {
        id: "order-1",
        attributes: {},
      },
    };
    expect(webhookHasData(data)).toBe(true);
  });
});
