export const generateMessage = (entity: string) => ({
    AlreadyExists: `${entity} already exists!`,
    NotFound: `${entity} not found!`,
    FailedToCreate: `Failed to create ${entity}!`,
    FailedToUpdate: `Failed to update ${entity}!`,
    FailedToDelete: `Failed to delete ${entity}!`,
});

export const message = {
    user: {
        ...generateMessage('User'),
        InvalidPassword: 'Invalid password!',
        PasswordNotMatch: 'Password and confirm password do not match!',
        InvalidCode: 'Invalid code!',
    },
    restaurant: generateMessage('Restaurant'),
    meal: {
        ...generateMessage('Meal'),
        SizeNotFound: 'Size not found!',
    },
    category: generateMessage('Category'),
    coupon: generateMessage('Coupon'),
    address: generateMessage('Address'),
    cart: {
        ...generateMessage('Cart'),
        MealDoesNotBelongToRestaurant: 'Meal does not belong to the specified restaurant. Do you want to delete your cart?',
    },
    promotion: generateMessage('Promotion'),
    order: generateMessage('Order'),
};
