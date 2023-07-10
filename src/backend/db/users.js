import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
    {
        _id: "7cZfWIp-q",
        firstName: "Adarsh",
        lastName: "Balika",
        username: "adarshbalika",
        password: "adarshBalika123",
        bio: "Learing React is fun",
        bookmarks: [],
        followers: [],
        following: [],
        avatarUrl:
            "data:image/jpeg;base64,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",
        website: "https://srijan-portfolio.netlify.app/",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: "79Gksh9otl",
        firstName: "Cristiano",
        lastName: "Ronaldo",
        username: "cristiano",
        password: "cr7",
        bio: "Footballer for portugal and Al Nassr",
        bookmarks: [],
        followers: [],
        following: [],
        avatarUrl:
            "https://res.cloudinary.com/dcxnaihyu/image/upload/v1687446308/images_vzavna.jpg",
        website: "https://en.wikipedia.org/wiki/Cristiano_Ronaldo",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: "1T6Be1QpLm",
        firstName: "Gareth",
        lastName: "Bale",
        username: "garethbale",
        password: "gareth_Bale",
        bio: "Golfer",
        bookmarks: [],
        followers: [],
        following: [],
        avatarUrl:
            "https://res.cloudinary.com/dcxnaihyu/image/upload/v1687446398/khif6p8ixquotvm3sh8e.jpg",
        website: "https://en.wikipedia.org/wiki/Gareth_Bale",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: "LCrc9f0Zl0",
        firstName: "Lionel",
        lastName: "Messi",
        username: "messi",
        password: "lm10",
        bio: "Footballer for Inter Miami and Argentina",
        bookmarks: [],
        followers: [],
        following: [],
        avatarUrl:
            "https://res.cloudinary.com/dcxnaihyu/image/upload/v1687446357/ejnugzngievwufhydg3g.jpg",
        website: "https://en.wikipedia.org/wiki/Lionel_Messi",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: "o5gzWjEeX_",
        firstName: "Elon",
        lastName: "Musk",
        username: "elon",
        password: "elon",
        bio: "Lets go to Mars",
        bookmarks: [],
        followers: [],
        following: [],
        avatarUrl:
            "https://res.cloudinary.com/dcxnaihyu/image/upload/v1687446443/fhymbcfvad6mjflduqxa.jpg",
        website: "https://en.wikipedia.org/wiki/Elon_Musk",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
];
