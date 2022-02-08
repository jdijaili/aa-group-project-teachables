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
                <li>React</li>
                <li>Redux</li>
                <li>JavaScript</li>
                <li>Python</li>
                <li>SQLAlchemy</li>
                <li>PostgreSQL</li>
                <li>CSS</li>
                <li>JSON API</li>
                <li>Git</li>
            </div>
        </ul>
    )
};

export default Footer;
