import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, MenuIcon, User } from 'lucide-react';

import SearchFilters from './SearchFilters';
import {
  PiCar,
  PiGridFour,
  PiInfo,
  PiPhone,
  PiShield,
  PiSteeringWheel,
} from 'react-icons/pi';

const MergedNav = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const accountMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const YOffset = location.pathname === '/' ? 600 : 0;

      if (currentScrollY > YOffset) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowTopBar(false);
      } else {
        setShowTopBar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isAccountMenuOpen && !isProfileMenuOpen) {
      return undefined;
    }
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsAccountMenuOpen(false);
        setIsProfileMenuOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isAccountMenuOpen, isProfileMenuOpen]);

  const isHomepage = location.pathname === '/';
  const hideSearchRoutes = [
    '/profile',
    '/signup',
    '/verify-email-sent',
    '/login',
    '/admin/login',
    '/admin/dashboard',
    '/admin/cars/new',
    '/admin/blogs/new',
    '/admin/cars/update',
    '/admin/blogs/update',
    '/admin/users',
  ];
  const showSearch = !hideSearchRoutes.includes(location.pathname);

  useEffect(() => {
    if (!isHomepage) {
      setIsNavVisible(true);
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setIsNavVisible(true);
    }, 80);
    return () => {
      window.clearTimeout(timer);
    };
  }, [isHomepage]);

  return (
    <div
      className={`sticky top-0 w-full z-20 transition-all duration-300 ${
        isScrolled ? 'bg-gray-200' : 'bg-linear-to-b from-white to-transparent'
      }`}
    >
      <motion.header
        className="absolute w-full"
        initial={isHomepage ? { y: -50, opacity: 0 } : false}
        animate={
          isHomepage
            ? { y: isNavVisible ? 0 : -50, opacity: isNavVisible ? 1 : 0 }
            : undefined
        }
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        <div
          className={`gap-2 p-2 px-4 transition-colors duration-200 ${
            isScrolled || !isHomepage
              ? 'bg-gray-100'
              : 'bg-linear-to-b from-black/50 to-transparent'
          }`}
        >
          <motion.div
            initial={{
              height: 'auto',
              opacity: 1,
              marginBottom: '0.5rem',
              overflow: 'visible',
            }}
            animate={
              showTopBar
                ? {
                    height: 'auto',
                    opacity: 1,
                    marginBottom: '0.5rem',
                    overflow: 'hidden',
                    transitionEnd: { overflow: 'visible' },
                  }
                : {
                    height: 0,
                    opacity: 0,
                    marginBottom: 0,
                    overflow: 'hidden',
                  }
            }
            transition={{ duration: 0.3 }}
            className={`w-full justify-between items-center flex z-49 pointer-events-auto`}
          >
            <Link to="/" className=" flex justify-center items-center">
              <div
                className={` ${
                  isScrolled || !isHomepage ? 'text-primary' : 'text-white'
                } font-geist text-xl sm:text-2xl flex lg:flex font-extrabold pointer-events-auto`}
              >
                CarDealership
              </div>
            </Link>
            <div className=" flex space-x-2 justify-center items-center">
              <div className="relative hidden lg:flex" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="h-10 w-10 btn bg-primary/10 shadow-none border-none p-2 text-primary btn-circle"
                >
                  <User className="size-7" />
                </button>
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <>
                      <motion.div
                        className="fixed inset-0 z-50 bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsProfileMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 w-72 bg-white rounded-3xl shadow-3xl border border-gray-100 p-5 z-80"
                      >
                        <div className="flex flex-col gap-2">
                          <Link
                            to="/profile"
                            className="block text-center w-full py-2 border-2 border-primary text-primary font-semibold rounded-full text-sm hover:bg-primary/5"
                          >
                            Log In
                          </Link>
                          <Link
                            to="/signup"
                            className="block text-center w-full py-2 border-2 border-primary text-primary font-semibold rounded-full text-sm hover:bg-primary/5"
                          >
                            Sign Up
                          </Link>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="ml-2 h-10 w-10 btn bg-primary/10 shadow-none border-none p-2 text-primary btn-circle"
                >
                  <MenuIcon className="size-7" />
                </button>
                <AnimatePresence>
                  {isMenuOpen && (
                    <>
                      <motion.div
                        className="fixed inset-0 z-70 bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 w-72 bg-white rounded-3xl shadow-3xl border border-gray-100 p-4 z-[80]"
                      >
                        <div className="flex flex-col gap-1">
                          <Link
                            to="/listings"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiCar className="text-primary size-5 mr-2" />{' '}
                            Listings
                          </Link>
                          <Link
                            to="/makes"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiSteeringWheel className="text-primary size-5 mr-2" />{' '}
                            Makes
                          </Link>
                          <Link
                            to="/categories"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiGridFour className="text-primary size-5 mr-2" />{' '}
                            Categories
                          </Link>
                          <Link
                            to="/contact"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiInfo className="text-primary size-5 mr-2" />{' '}
                            About US
                          </Link>
                          <Link
                            to="/contact"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiPhone className="text-primary size-5 mr-2" />{' '}
                            Contact
                          </Link>
                          <Link
                            to="/"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiShield className="text-primary size-5 mr-2" />{' '}
                            Privacy Policy
                          </Link>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative lg:hidden" ref={accountMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="h-10 w-10 btn bg-primary/10 shadow-none border-none p-2 text-primary btn-circle"
                >
                  <Menu className="size-7" />
                </button>
                <AnimatePresence>
                  {isAccountMenuOpen && (
                    <>
                      <motion.div
                        className="fixed inset-0 z-[70] bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsAccountMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 w-72 bg-white rounded-3xl shadow-3xl border border-gray-100 p-5 z-[80]"
                      >
                        <div className="flex flex-col gap-2 mb-2">
                          <Link
                            to="/profile"
                            className="block text-center w-full py-2 border-2 border-primary text-primary font-semibold rounded-full text-sm hover:bg-primary/5"
                          >
                            Log In
                          </Link>
                          <Link
                            to="/signup"
                            className="block text-center w-full py-2 border-2 border-primary text-primary font-semibold rounded-full text-sm hover:bg-primary/5"
                          >
                            Sign Up
                          </Link>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Link
                            to="/listings"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiCar className="text-primary size-5 mr-2" />{' '}
                            Listings
                          </Link>
                          <Link
                            to="/makes"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiSteeringWheel className="text-primary size-5 mr-2" />{' '}
                            Makes
                          </Link>
                          <Link
                            to="/categories"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiGridFour className="text-primary size-5 mr-2" />{' '}
                            Categories
                          </Link>
                          <Link
                            to="/contact"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiInfo className="text-primary size-5 mr-2" />{' '}
                            About US
                          </Link>
                          <Link
                            to="/contact"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiPhone className="text-primary size-5 mr-2" />{' '}
                            Contact
                          </Link>
                          <Link
                            to="/"
                            className="w-full flex space-x-2 items-center justify-start text-start py-4 border-none hover:bg-primary/10 rounded-full text-sm px-2"
                          >
                            {' '}
                            <PiShield className="text-primary size-5 mr-2" />{' '}
                            Privacy Policy
                          </Link>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center w-full justify-center">
            {showSearch && (
              <SearchFilters
                className={`${isHomepage && !isScrolled ? 'hidden' : ''}`}
              />
            )}
          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default MergedNav;
