export const genres = [
    { _id: "33h54j3h4j5h3j45h3", name: "Action" },
    { _id: "sdfndf7s8f787f78s7d", name: "Comedy" },
    { _id: "8s67876sd8c76778d68c", name: "Thriller" },
]

export function getGenres() {
    return genres.filter(g => g)
}