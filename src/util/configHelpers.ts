import InvalidEnvironmentVariableError from "@/errors/InvalidEnvironmentVariableError";
import MissingEnvironmentVariableError from "@/errors/MissingEnvironmentVariableError";
import { indicatesEnabled } from "@/util/strings";

/**
 * Parses the value of an environment variable into a string.
 *
 * @throws MissingEnvironmentVariableError if no value has been properly defined.
 * @param key - The environment variable name.
 * @param environmentValue - The value of the environment variable; this should
 * _always_ be from `process.env`.
 */
export function parseEnvString(
  key: string,
  environmentValue: string | undefined | null
): string {
  requireEnvValue(key, environmentValue);
  return `${environmentValue}`;
}

/**
 * Parses the value of an environment variable into a number.
 *
 * @throws MissingEnvironmentVariableError if no value has been properly defined
 * or if the provided value cannot be converted into a number.
 * @param key - The environment variable name.
 * @param environmentValue - The value of the environment variable; this should
 * _always_ be from `process.env`.
 */
export function parseEnvNumber(
  key: string,
  environmentValue: string | undefined | null
): number {
  requireEnvValue(key, environmentValue);
  const numericalValue = parseInt(environmentValue as string, 10);

  if (isNaN(numericalValue)) {
    throw new InvalidEnvironmentVariableError(
      `Invalid Environment Variable Value for '${key}'; could not coerce '${environmentValue}' into a number.`
    );
  }

  return numericalValue;
}

/**
 * Parses the value of an environment variable into a boolean that indicates
 * if some feature or setting is 'enabled'.
 *
 * @throws MissingEnvironmentVariableError if no value has been properly defined
 * or if the provided value cannot be converted into a number.
 * @param key - The environment variable name.
 * @param environmentValue - The value of the environment variable; this should
 * _always_ be from `process.env`.
 */
export function parseEnvEnabler(
  key: string,
  environmentValue: string | undefined | null
): boolean {
  requireEnvValue(key, environmentValue);
  return indicatesEnabled(environmentValue as string, false);
}

/**
 * Requires that an environment variable be provided.
 *
 * @throws MissingEnvironmentVariableError if no value has been properly defined.
 * @param key - The environment variable name.
 * @param environmentValue - The value of the environment variable; this should
 * _always_ be from `process.env`.
 */
function requireEnvValue(
  key: string,
  environmentValue: string | undefined | null
): void {
  if (
    environmentValue === undefined ||
    environmentValue === null ||
    environmentValue === "_required_"
  ) {
    throw new MissingEnvironmentVariableError(
      `Missing required environment variable: ${key}`
    );
  }
}
