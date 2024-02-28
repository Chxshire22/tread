import {
	HouseFill,
	Search,
	PlusSquareFill,
	PersonCircle,
} from "react-bootstrap-icons";
import Link from "next/link";
import styles from './styles.module.css';

import { getServerSession } from "next-auth";
import options from "../../app/api/auth/[...nextauth]/options";

const Navbar = async () => {
	const session = await getServerSession(options);
	return (
		<nav className={styles.navcontainer}>
			<ul className="nav navlist justify-content-evenly w-100">
				<li className="nav-item">
					<Link className="nav-link active" aria-current="page" href="/">
						<HouseFill size={25} color={"#AFD8F2"} />
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" href="/">
						<Search  size={25} color={"#AFD8F2"}/>
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" href="/">
						<PlusSquareFill  size={25} color={"#AFD8F2"}/>
					</Link>
				</li>
				<li className="nav-item">
					<div className=" dropup nav-link">
						<div data-bs-toggle="dropdown" aria-expanded="false">
							<PersonCircle  size={25} color={"#AFD8F2"}/>
						</div>
						<ul className="dropdown-menu">
							<li>
								{session ? (
									<Link href="/api/auth/signout?callbackUrl=/">Log Out</Link>
								) : (
									<Link href="/api/auth/signin?callbackUrl=/">Log In</Link>
								)}
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
