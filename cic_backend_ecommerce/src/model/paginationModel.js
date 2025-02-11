// class Pagination {
//     constructor(query, page, perPage) {
//         this.query = query || ""; // The search query
//         this.page = parseInt(page, 10) || 1; // Current page
//         this.perPage = parseInt(perPage, 10) || 10; // Items per page
//         this.offset = (this.page - 1) * this.perPage; // Offset for SQL query
//     }

//     buildResponse(result, totals) {
//         const totalPages = Math.ceil(totals / this.perPage);
//         return {
//             page: this.page,
//             perPage: this.perPage,
//             totals,
//             totalPages,
//             result,
//         };
//     }
// }

// module.exports = Pagination;
class Pagination {
    constructor(query, page, perpage) {
        this.query = query || ""; // The search query
        this.page = this.validateNumber(page, 1); // Default to page 1
        this.perPage = this.validateNumber(perpage, 10); // Default to 10 items per page
        this.offset = (this.page - 1) * this.perPage; // Offset for SQL query
    }

    validateNumber(value, defaultValue) {
        const num = parseInt(value, 10);
        return isNaN(num) || num <= 0 ? defaultValue : num;
    }

    buildResponse(result, totals) {
        const totalPages = Math.ceil(totals / this.perPage);
        return {
            page: this.page,
            perPage: this.perPage,
            totals,
            totalPages,
            result,
        };
    }
}

module.exports = Pagination;
