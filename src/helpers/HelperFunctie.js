

export const truncate = (input) =>
    input?.length > 101 ? input.substring(0, 100) + '...' : input;