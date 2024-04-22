import type { RDKitModule } from "@rdkit/rdkit";

export {};

declare global {
  interface Window {
    RDKit: RDKitModule;
  }
}