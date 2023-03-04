import { FunctionComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Wallet } from './Wallet';
import { Header } from './Header';
import { Logo, RaiseAFundBtn } from './common';
import { cx } from '~/lib/cx';

const Layout: FunctionComponent<{ children: JSX.Element; className: string }> = ({ children, className }) => {
	return (
		<Wallet>
			<Head>
				<title>Socha</title>
			</Head>
			<div className={cx(className, 'main')}>
				<Header />
				{children}
				<footer className={'footer'}>
					<div className={'nav'}>
						<div className={'left'}>
							<Logo />
							<div className={'content'}>
								<div className={'category'}>
									<h1>Solutions</h1>
									<Link href="/">Transparency</Link>
									<Link href="/">Crypto donations made simple</Link>
									<Link href="/">Inherit funding</Link>
								</div>
								<div className={'category'}>
									<h1>Funding</h1>
									<Link href="/">Communities</Link>
									<Link href="/">How to use</Link>
									<Link href="/">Become a Donor</Link>
								</div>
								<div className={'category'}>
									<h1>About Socha</h1>
									<Link href="/">About us</Link>
									<Link href="/">Meet the team</Link>
								</div>
							</div>
						</div>
						<div className={'right'}>
							<div className={'socials'}></div>
							<div>Do Better Together</div>
							<div>Transparency for Community</div>
							<RaiseAFundBtn />
						</div>
					</div>
					<div className={'footnote'}>
						<div>Copyright @ 2023 Solcha | All Rights Reseved</div>
						<div>
							<Link href="/">Privacy policy</Link>
							<Link href="/">Terms of services</Link>
							<Link href="/">Cryto risk disclaimer</Link>
						</div>
					</div>
				</footer>
			</div>
		</Wallet>
	);
};

export default Layout;
