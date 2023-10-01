import { Link } from "react-router-dom";

import useStore from "../store.js";

const Navbar = () => {
  const auth = useStore((state) => state.auth);
  const logOut = useStore((state) => state.logOut);

  return (
    <nav className='min-h-[64px] w-full bg-black flex items-center text-white'>
      <div className='w-full'>
        <div className='max-w-screen-xl mx-auto flex items-center justify-between px-2'>
          <div className='text-2xl font-bold hover:scale-[1.01] transition-all ease-linear'>
            <Link to='/'>To Do</Link>
          </div>
          <div>
            {auth ? (
              <button
                className='px-8 py-2 rounded bg-zinc-400 hover:bg-zinc-500 font-bold transition-all ease-in'
                onClick={() => logOut()}>
                Log Out
              </button>
            ) : (
              <Link to='/auth'>
                <button className='px-8 py-2 rounded bg-zinc-400 hover:bg-zinc-500 font-bold transition-all ease-in'>
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
