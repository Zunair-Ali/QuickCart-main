import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest data to save user data from database
export const snycUserCreation = inngest.createFunction(
    {
        id:"sync-user-form-clerk"
    },
    {
        event:"clerk/user.created"
    },
    async (event) => {
        const {id,first_name,last_name,email_addresses,image_url} = event.data
        const userData ={
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name + '' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)
    }
)
// Inngest Function to update user data in database

export const snycUserUpdation = inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    {event:'clerk/user.updated'},
    async (event) => {
        const {id,first_name,last_name,email_addresses,image_url} = event.data
        const userData ={
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name + '' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)
    }
)
// Inngest funtion delete data from database

export const snycUserDeletion = inngest.createFunction(
    {
        id:'delete-user-from-clerk'
    },
    {event:'clerk/user.delete'},
    async (event) => {
        const {id} = event.data
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)

// This file is used to configure Inngest functions for syncing user order with Clerk and database.

export const createUserOrder = inngest.createFunction(
    {
        id: "create-user-order",
        batachEvents:{
            maxSize: 5, // Maximum number of events to process in a batch
            timeout: '5s' // Maximum duration to wait for events in milliseconds (5 minutes)
        }
    },
    {
        event: "order/created"
    },
    async ({events}) => {
        const orders = events.map((event) => {
            return {
                userId :event.data.userId,
                items: event.data.items,
                address: event.data.address,
                amount: event.data.amount,
                date:event.data.date,
            };
        });
        await connectDB();
        await Order.insertMany(orders);
        return {success: true, processed: orders.length};
    }
);