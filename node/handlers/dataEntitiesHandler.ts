import { Context } from 'koa'

export async function dataEntitiesHandler(ctx: Context) {
    try {
        const { clients } = ctx

        const { start, end } = ctx.request.query
        console.log(start, end, "Start and end")
        ctx.body = await clients.dataEntities.getDataEntities(start, end)

        ctx.status = 200
    } catch (error) {
        console.error('Error in dataEntitiesHandler:', error)
        ctx.status = 500
        ctx.body = {
            message: 'Internal server error',
            error: error.message
        }
    }
}
