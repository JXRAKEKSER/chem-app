import { hash, hashSync, compare } from "bcryptjs";

class HashUtils {
  public static hash(payload: string, salt: string | number): Promise<string> {
    return hash(payload, salt);
  }
  public static hashSync(payload: string, salt: string | number): string {
    return hashSync(payload, salt);
  }
  public static compare(
    comparableValue: string,
    hashValue: string
  ): Promise<boolean> {
    return compare(comparableValue, hashValue);
  }
}

export default HashUtils;
