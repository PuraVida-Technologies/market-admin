/**
 * Checks to see if the provided `val` parameter is string.
 *
 * @param val
 */
export function isString(val: unknown): boolean {
  return typeof val === "string" || val instanceof String;
}

/**
 * Checks to see if the value, provided as `val`, indicates that something
 * should be enabled.
 *
 * @param val
 * @param enableByDefault - Determines whether to return TRUE or FALSE when
 * the value cannot be resolved.
 */
export function indicatesEnabled(
  val: string,
  enableByDefault = false
): boolean {
  const parsedValue: string = `${val}`.toLowerCase();
  switch (parsedValue) {
    // The following values should indicate that
    // something should DEFINITELY be ENABLED.
    case "1":
    case "on":
    case "enable":
    case "enabled":
    case "yes":
    case "y":
    case "true":
      return true;

    // The following values should indicate that
    // something should DEFINITELY be DISABLED.
    case "0":
    case "off":
    case "disable":
    case "disabled":
    case "no":
    case "n":
    case "false":
      return false;

    // Everything else should result in the default.
    default:
      return enableByDefault;
  }
}
