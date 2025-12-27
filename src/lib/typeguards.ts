/**
 * Type guard to check if an object has the meta property with event_name.
 */
export function webhookHasMeta(
  data: unknown
): data is {
  meta: { event_name: string; custom_data: { user_id: string } };
  [key: string]: unknown;
} {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;
  return (
    "meta" in obj &&
    typeof obj.meta === "object" &&
    obj.meta !== null &&
    "event_name" in (obj.meta as Record<string, unknown>) &&
    typeof (obj.meta as Record<string, unknown>).event_name === "string" &&
    "custom_data" in (obj.meta as Record<string, unknown>)
  );
}

/**
 * Type guard to check if an object has the data property with attributes.
 */
export function webhookHasData(
  data: unknown
): data is {
  data: {
    id: string;
    attributes: Record<string, unknown>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
} {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;
  return (
    "data" in obj &&
    typeof obj.data === "object" &&
    obj.data !== null &&
    "attributes" in (obj.data as Record<string, unknown>)
  );
}
