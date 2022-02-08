

const movies = [
    {
        _id: "4354hv33454hv345v345",
        title: "Terminator",
        genre: { _id: "33h54j3h4j5h3j45h3", name: "Action" },
        numberInStock: 6,
        dailyRentalRate: 2.5,
        publishDate: "2018-01-03T19:04:28.089Z"
    },
    {
        _id: "4345h45h34jhfg343434",
        title: "Die Hard",
        genre: { _id: "33h54j3h4j5h3j45h3", name: "Action" },
        numberInStock: 5,
        dailyRentalRate: 2.5,
    },
    {
        _id: "3434hg3jh4534hkjkj434",
        title: "Trip To Italy",
        genre: { _id: "33h54j3h4j5h3j45h3", name: "Action" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
    },
    {
        _id: "68gjhm67g6h45g43hg343h",
        title: "Hangover",
        genre: { _id: "sdfndf7s8f787f78s7d", name: "Comedy" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
    },
    {
        _id: "3h2h32hkjf6kj434jkh43j",
        title: "Airplane",
        genre: { _id: "sdfndf7s8f787f78s7d", name: "Comedy" },
        numberInStock: 2,
        dailyRentalRate: 3.5,
    },
    {
        _id: "fg8fdg8fg89fdgd65fg5dfg",
        title: "Friends",
        genre: { _id: "sdfndf7s8f787f78s7d", name: "Comedy" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
    },
    {
        _id: "8dffg6dfg4gf7fgdg9nuvjh",
        title: "Gone Girl",
        genre: { _id: "8s67876sd8c76778d68c", name: "Thriller" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
    },
    {
        _id: "sdfsfsd7s7df6sdf54sf7f8",
        title: "wedding Crashers",
        genre: { _id: "8s67876sd8c76778d68c", name: "Thriller" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
    },
    {
        _id: "nnhuhsdsf6d5s4d6f465sdf5",
        title: "Tom",
        genre: { _id: "8s67876sd8c76778d68c", name: "Thriller" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
    },
]


export function getMovies(){
    return movies;
}