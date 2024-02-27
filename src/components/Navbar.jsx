import {
	HouseFill,
	Search,
	PlusSquareFill,
	PersonCircle,
} from "react-bootstrap-icons";
import Link from "next/link";

import { getServerSession } from "next-auth";
import options from "../app/api/auth/[...nextauth]/options";

const Navbar = async () => {
	const session = await getServerSession(options);
	return (
		<ul class="nav justify-content-center">
			<li class="nav-item">
				<Link class="nav-link active" aria-current="page" href="/">
					<HouseFill />
				</Link>
			</li>
			<li class="nav-item">
				<Link class="nav-link" href="/">
					<Search />
				</Link>
			</li>
			<li class="nav-item">
				<Link class="nav-link" href="/">
					<PlusSquareFill />
				</Link>
			</li>
			<li class="nav-item">
				<div class="btn-group dropup nav-link">
					<div
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<PersonCircle />
					</div>
					<ul class="dropdown-menu"></ul>
				</div>

			</li>
		</ul>
	);
};

export default Navbar;
