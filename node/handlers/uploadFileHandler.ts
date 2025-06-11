import { Context } from 'koa'

// Extend the Koa request type to include files and body
declare module 'koa' {
    interface Request {
        files?: {
            files: any
        }
        body?: {
            documentId: string
        }
    }
}

export async function uploadFileHandler(ctx: Context) {
    try {
        const { clients } = ctx
        
        // Get form data from Koa's request object
        const file = ctx.request.files?.files
        console.log(file, 'file')
        const documentId = ctx.request.body?.documentId
        console.log(documentId, 'documentId')

        if (!file) {
            ctx.status = 400
            ctx.body = { 
                message: 'No file provided in form-data',
                help: 'Make sure to use "files" as the field name in your form data'
            }
            return
        }

        if (!documentId) {
            ctx.status = 400
            ctx.body = { 
                message: 'Document ID is required in form-data',
                help: 'Make sure to include "documentId" field in your form data'
            }
            return
        }

        // Pass the file and document ID to the upload client
        const response = await clients.uploadFileClient.uploadFileWithHeaders(file, documentId)
        ctx.body = response
        ctx.status = 200
    }
    catch (error) {
        console.error('Error in upload file handler:', error)
        ctx.status = 500
        ctx.body = {
            message: 'Internal server error',
            error: error.message
        }
    }
}