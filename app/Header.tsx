import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import DarkModeButton from './DarkModeButton'

import NavLinks from './NavLinks'
import SearchBox from './SearchBox'

const Header = () => {
    return (
        <header>
            <div className="grid grid-cols-3 p-10 items-center">
                <Bars3Icon className="w-8 h-8 cursor-pointer" />
                <Link href="/" prefetch={false}>
                    <h1 className="font-serif text-3xl text-center">
                        The{' '}
                        <span className="underline decoration-6 decoration-orange-400">
                            Daily Inquirer
                        </span>{' '}
                        News
                    </h1>
                </Link>

                <div className="flex items-center justify-end space-x-2">
                    <DarkModeButton />

                    <button
                        className="hidden md:inline bg-slate-900
                        text-white px-4 lh:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-800"
                    >
                        Subscribe Now
                    </button>
                </div>
            </div>

            <NavLinks />

            <SearchBox />
        </header>
    )
}

export default Header