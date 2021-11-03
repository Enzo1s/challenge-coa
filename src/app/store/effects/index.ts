import { ProductsEffects } from "./products.effects";
import { CartsEffects } from "./carts.effects";
import { ProductCartEffects } from "./productsCarts.effects";
import { AuthEffects } from "./auth.effects";
import { UserCartEffects } from "./userCart.effects";

export const effectsArr: any[] = [
    ProductsEffects,
    CartsEffects,
    ProductCartEffects,
    AuthEffects,
    UserCartEffects
];