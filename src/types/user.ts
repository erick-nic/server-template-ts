interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
    createdAt?: Date;
    updatedAt?: Date;   
}

export default IUser;
