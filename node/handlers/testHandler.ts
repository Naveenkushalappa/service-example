// import { IOContext } from "@vtex/api"
import { Context } from 'koa'

export async function testHandler(ctx: Context) {
  const {
    vtex: { account, workspace },
  } = ctx

  console.log(account, workspace)

  ctx.body = {
    message: `Hello from VTEX IO! ${account} ${workspace}`
  }

  ctx.status = 200
}