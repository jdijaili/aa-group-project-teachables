import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <ul className='footer'>
            <div className='footer-devs'>
                <div className='dev'>
                    <li>Jennifer Dijaili</li>
                    <li className='dev-icons'>
                        <a href='https://github.com/jdijaili' target='_blank' rel='noreferrer'>
                            <i className='fab fa-github' />
                        </a>
                        <a href='https://www.linkedin.com/in/jennifer-dijaili/' target='_blank' rel='noreferrer'>
                            <i className='fab fa-linkedin' />
                        </a>
                    </li>
                </div>
                <div className='dev'>
                    <li>Nathaniel Tseng</li>
                    <li className='dev-icons'>
                        <a href='https://github.com/ntseng' target='_blank' rel='noreferrer'>
                            <i className='fab fa-github' />
                        </a>
                        <a href='https://www.linkedin.com/in/nathaniel-tseng-14404838/' target='_blank' rel='noreferrer'>
                            <i className='fab fa-linkedin' />
                        </a>
                    </li>
                </div>
                <div className='dev'>
                    <li>Ryan Bender</li>
                    <li className='dev-icons'>
                        <a href='https://github.com/ryanbender34' target='_blank' rel='noreferrer'>
                            <i className='fab fa-github' />
                        </a>
                        <a href='https://www.linkedin.com/in/ryan-bender-0b5b16127/' target='_blank' rel='noreferrer'>
                            <i className='fab fa-linkedin' />
                        </a>
                    </li>
                </div>
                <div className='dev'>
                    <li>Yu Ra Kim</li>
                    <li className='dev-icons'>
                        <a href='https://github.com/kim-yura' target='_blank' rel='noreferrer'>
                            <i className='fab fa-github' />
                        </a>
                        <a href='https://www.linkedin.com/in/yura-kim/' target='_blank' rel='noreferrer'>
                            <i className='fab fa-linkedin' />
                        </a>
                    </li>
                </div>
            </div>
            <div className='footer-tech'>
                <li><a class='tech-link' href='https://reactjs.org/' target='_blank' rel='noreferrer'>React</a></li>
                <li><a class='tech-link' href='https://redux.js.org/' target='_blank' rel='norefferer'>Redux</a></li>
                <li><a class='tech-link' href='https://www.javascript.com/' target='_blank' rel='noreferrer'>JavaScript</a></li>
                <li><a class='tech-link' href='https://www.python.org/' target='_blank' rel='noreferrer'>Python</a></li>
                <li><a class='tech-link' href='https://www.sqlalchemy.org/' target='_blank' rel='noreferrer'>SQLAlchemy</a></li>
                <li><a class='tech-link' href='https://www.postgresql.org/' target='_blank' rel='noreferrer'>PostgreSQL</a></li>
                <li><a class='tech-link' href='https://developer.mozilla.org/en-US/docs/Web/CSS' target='_blank' rel='noreferrer'>CSS</a></li>
                <li><a class='tech-link' href='https://jsonapi.org/' target='_blank' rel='norefferer'>JSON API</a></li>
                <li><a class='tech-link' href='https://git-scm.com/' target='_blank' rel='noreferrer'>Git</a></li>
            </div>
        </ul>
    )
};

export default Footer;
