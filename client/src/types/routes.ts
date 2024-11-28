const source = "http://localhost:3001"

export const ROUTES = {
    // HOME :`${source}/`,
    ARSIP :`${source}/api/letter/`,
    ARSIP_PDF :`${source}/api/letter/pdf/`,
    CATEGORY : `${source}/api/category/`,
}
export const ROUTES_CLIENT = {
    HOME :`/`,
    ARSIP :`/arsip`,
    ARSIP_CREATE :`/create_pdf`,
    ARSIP_PDF :`pdf/`,
    ARSIP_PDF_UPDATE :`pdf/update/`,
    CATEGORY : `/category`,
    CATEGORY_CREATE : `/create_category`,
}