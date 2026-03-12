import React, { useRef, useState } from 'react'

import gsap from 'gsap'
import { ScrollToPlugin } from "gsap/all";
gsap.registerPlugin(ScrollToPlugin);

import { AiFillHome } from 'react-icons/ai'
import { FaFaceSmile, FaFaceSurprise, FaLightbulb } from 'react-icons/fa6'

import NavbarLinks from './NavbarLinks'

const navItems = [
	{
		id: 1,
		icon: <AiFillHome className="home-link icon-link" />,
		info: 'home'
	},
	{
		id: 2,
		icon: <FaFaceSmile className="achievements-link icon-link" />,
		info: 'journey',
	},
	{
		id: 3,
		icon: <FaLightbulb className="projects-link icon-link" />,
		info: 'achievements'
	},
];

const pages = ['home', 'journey', 'achievements']

const Navbar = ({ currentPage, pagesLight = false }) => {
	const [currentLinkTarget, setCurrentLinkTarget] = useState(0);
	const root = useRef(null);

	// useLayoutEffect(() => {
	// 	const ctx = gsap.context(() => {
	// 		gsap.killTweensOf('.navlink');
	// 		gsap.to('.navlink', { background: 'rgba(0, 0, 0, 0.05)', width: '45%', duration: 0.2, ease: 'power2.inOut' });

	// 		if (currentLinkTarget !== 0) {
	// 			gsap.killTweensOf(`.link${currentLinkTarget}`);
	// 			gsap.to(`.link${currentLinkTarget}`, { background: 'rgba(0, 0, 0, 0.1)', width: '55%', duration: 0.2, ease: 'power2.inOut' });
	// 		}
	// 	}, root)

	// }, [currentLinkTarget])

	return (
		<div className="navbar" ref={root}>
			{/* <div className="title flex-1 opacity-0">
				<h1>
					Eric
				</h1>
			</div> */}

			<div className={`navlinks`}>
				{navItems.map((item) => (
					<NavbarLinks
						key={item.id}
						index={item.id}
						pageInfo={item.info}
						currentPage={currentPage}
						currentLinkTarget={currentLinkTarget}
						setCurrentLinkTarget={setCurrentLinkTarget}
						onClickFunction={() => {
							const section = document.getElementById(pages[item.id - 1]);
							if (!section) return;

							gsap.to(window, {
								duration: 1.5,
								scrollTo: section,
								ease: "power1.inOut",
							});
						}}
						pagesLight={pagesLight}
					>
						{item.icon}
					</NavbarLinks>
				))}
			</div>

			{/* <div className="logo flex-1 opacity-0">LOGO</div> */}
		</div>
	)
}

export default Navbar
