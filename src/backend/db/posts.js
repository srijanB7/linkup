import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
    {
        _id: "xhzTkUi2Nt",
        content: "React is fun!!",
        mediaURL: "",
        likes: {
            likeCount: 10,
            likedBy: [],
            dislikedBy: [],
        },
        comments: [],
        username: "adarshbalika",
        createdAt: "2022-05-10T10:55:06+05:30",
        updatedAt: formatDate(),
    },
    {
        _id: "3XHvLP1fg",
        content: "Great win against Iceland. Happy to be on the scoresheet",
        mediaURL: "data:image/jpeg;base64,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",
        likes: {
            likeCount: 50,
            likedBy: [],
            dislikedBy: [],
        },
        comments: [],
        username: "cristiano",
        createdAt: "2023-06-20T10:55:06+05:30",
        updatedAt: formatDate(),
    },
    {
        _id: "9XHvLP1fh",
        content: "After a great time with PSG. I have joined Inter Miami",
        mediaURL: "",
        likes: {
            likeCount: 1,
            likedBy: [],
            dislikedBy: [],
        },
        comments: [],
        username: "messi",
        createdAt: "2023-06-10T10:55:06+05:30",
        updatedAt: formatDate(),
    },
    {
        _id: "5XHvGP5fz",
        content:
            "I'm announcing my retirement from professional football. It has been an amazing journey.",
        mediaURL: "",
        likes: {
            likeCount: 1,
            likedBy: [],
            dislikedBy: [],
        },
        comments: [],
        username: "garethbale",
        createdAt: "2023-01-17T10:55:06+05:30",
        updatedAt: formatDate(),
    },
    {
        _id: "8VVvGP9ez",
        content:
            "We are announcing Twitter blue. Subscription model for blue tick.",
        mediaURL: "",
        likes: {
            likeCount: 28,
            likedBy: [],
            dislikedBy: [],
        },
        comments: [],
        username: "elon",
        createdAt: "2022-11-14T10:55:06+05:30",
        updatedAt: formatDate(),
    },
    {
        _id: "7XCvLP1fg",
        content: "Leaving Juventus was a mistake",
        mediaURL: "",
        likes: {
            likeCount: 100,
            likedBy: [],
            dislikedBy: [],
        },
        comments: [],
        username: "cristiano",
        createdAt: "2022-12-10T10:55:06+05:30",
        updatedAt: formatDate(),
    },
    {
        _id: "xhzzkMMtt2Nt",
        content: "Hard work is important.",
        mediaURL: "",
        likes: {
            likeCount: 5,
            likedBy: [],
            dislikedBy: [],
        },
        comments: [],
        username: "adarshbalika",
        createdAt: "2023-06-10T10:55:06+05:30",
        updatedAt: formatDate(),
    },
];
