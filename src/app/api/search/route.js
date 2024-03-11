import { User, Thread, Threads_Content } from "@/app/models";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function GET(res, { params: { query } }) {
  try {
    const usersPromise = User.findAll({
      where: { username: { [Op.iLike]: `%${query}%` } },
    });
    const threadsPromise = Thread.findAll({
      where: { destination: { [Op.iLike]: `%${query}%` } },
    });
    const threadsContentPromise = Threads_Content.findAll(
      {
        where: { location: { [Op.iLike]: `%${query}%` } },
        include: [Thread]
      }
    );

    const [users, threads, threadsContents] = await Promise.all([
      usersPromise,
      threadsPromise,
      threadsContentPromise,
    ]);

    const results = {
      users,
      threads,
      threadsContents,
    };
    return NextResponse.json(results);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: true, msg: err });
  }
}
