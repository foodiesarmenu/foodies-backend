export const generateMessage = (entity: string) => ({
    AlreadyExists: `${entity} already exists!`,
    NotFound: `${entity} not found!`,
    FailedToCreate: `Failed to create ${entity}!`,
    FailedToUpdate: `Failed to update ${entity}!`,
    FailedToDelete: `Failed to delete ${entity}!`,
});

export const message = {
    user: generateMessage('User'),
    meal: generateMessage('Meal'),
};
