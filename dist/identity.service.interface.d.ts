import { Identity } from "./identity.interface";
/**
 * user identity service abstract
 */
export interface IdentityServiceInterface<T = Identity> {
    findById(id: string): Promise<T>;
}
//# sourceMappingURL=identity.service.interface.d.ts.map