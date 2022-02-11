import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { deleteProject } from "../../store/projects";
import { deleteStep } from "../../store/steps";
import './DeletePage.css';

const DeletePage = () => {

    return (
        <>
            <div>DELETE PAGE</div>
        </>
    )
};

export default DeletePage;
