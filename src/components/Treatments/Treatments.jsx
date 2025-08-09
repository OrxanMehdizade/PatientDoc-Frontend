import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  fetchTreatments,
  deleteTreatmentById,
} from "../../store/fetchs/treatmentActions";
import { useLoading } from "../../LoadingContext";
import { useNavigate } from "react-router-dom";
import FilterDrawer from "./FilterDrawer.jsx"; // Import the FilterDrawer component
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext.js";
import "../../assets/styles/User/Treatment/Treatments.css";

const Treatments = () => {
  const { language } = useContext(LanguageContext);
  const treatmentsDictionary = Translation[language].treatments;
  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  const { treatments, paginationMeta } = useSelector(
    (state) => state.treatment
  );
  const [page, setPage] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchTreatments(page, 10));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, page, setLoading]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = treatments;

      if (filters.diagnoses && filters.diagnoses.length > 0) {
        filtered = filtered.filter((treatment) =>
          treatment.diagnoseNames.some((diagnose) =>
            filters.diagnoses.map((d) => d.label).includes(diagnose)
          )
        );
      }

      if (filters.service) {
        filtered = filtered.filter((treatment) =>
          treatment.serviceName
            .toLowerCase()
            .includes(filters.service.label.toLowerCase())
        );
      }

      setFilteredTreatments(filtered);
    };

    applyFilters();
  }, [filters, treatments]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await dispatch(deleteTreatmentById(id));
    await dispatch(fetchTreatments(page, 10)); // Refresh the treatments list after deletion
    setLoading(false);
  };

  const handleApplyFilter = (filterOptions) => {
    setFilters(filterOptions);
  };

  return (
    <div className="user-treatment-container user-box-shadow">
      <div className="user-treatment-header">
        <h2>{treatmentsDictionary.header}</h2>
        <div>
          <Button
            variant="contained"
            className="app-theme-color"
            onClick={() => navigate("/user/add-treatment")}
          >
            {treatmentsDictionary.newTreatmentButton}
          </Button>
          <Button
            variant="contained"
            className="app-theme-color"
            onClick={() => setFilterDrawerOpen(true)}
          >
            <FilterAltRoundedIcon />
          </Button>
        </div>
      </div>
      <div className="user-treatment-content">
        <TableContainer>
          <Table aria-label="treatments table">
            <TableHead>
              <TableRow>
                <TableCell className="user-table-header">#</TableCell>
                <TableCell className="user-table-header">
                  {treatmentsDictionary.tableHeaders.patient}
                </TableCell>
                <TableCell className="user-table-header deactive">
                  {treatmentsDictionary.tableHeaders.date}
                </TableCell>
                <TableCell className="user-table-header">
                  {treatmentsDictionary.tableHeaders.service}
                </TableCell>
                <TableCell className="user-table-header deactive">
                  {treatmentsDictionary.tableHeaders.diagnosis}
                </TableCell>
                <TableCell className="user-table-header">
                  {treatmentsDictionary.tableHeaders.action}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTreatments.map((treatment, index) => (
                <TableRow key={index + 1} className="user-patient-row">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{treatment.patientName}</TableCell>
                  <TableCell className="deactive">
                    {dayjs(treatment.date).format("YYYY-MM-DD HH:mm")}
                  </TableCell>
                  <TableCell>{treatment.serviceName}</TableCell>
                  <TableCell className="deactive">
                    {treatment.diagnoseNames.join(", ")}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="default"
                      onClick={() =>
                        navigate(`/user/show-treatment/${treatment.id}`)
                      }
                    >
                      <VisibilityRoundedIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/user/edit-treatment/${treatment.id}`)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(treatment.id)}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Box
        display="flex"
        justifyContent="center"
        className="pagination-container"
      >
        <Pagination
          count={paginationMeta ? paginationMeta.totalPages : 1}
          page={page}
          onChange={handlePageChange}
          color="primary"
          className="app-theme-color"
        />
      </Box>
      <FilterDrawer
        open={filterDrawerOpen}
        handleClose={() => setFilterDrawerOpen(false)}
        applyFilter={handleApplyFilter}
        selectedDiagnoses={filters.diagnoses}
        selectedService={filters.service}
      />
    </div>
  );
};

export default Treatments;
