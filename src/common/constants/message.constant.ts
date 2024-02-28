export const generateMessage = (entity: string) => ({
    AlreadyExists: `${entity} already exists!`,
    NotFound: `${entity} not found!`,
    FailedToCreate: `Failed to create ${entity}!`,
    FailedToUpdate: `Failed to update ${entity}!`,
    FailedToDelete: `Failed to delete ${entity}!`,
});

export const message = {
    user: generateMessage('User'),
    restaurant: generateMessage('Restaurant'),
    meal: generateMessage('Meal'),
    category : generateMessage('Category')
};
