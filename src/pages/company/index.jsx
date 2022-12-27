import "./list.scss"
import { useMutation, useQuery } from "@tanstack/react-query"
import { companyColumns } from "../../datatablesource"
import DatatableTemplate from "../../components/datatableTemplate/DatatableTemplate"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { companyActionColumn } from "../../columnAction"
import companyService from "../../services/companyService"
import {v4 as uuidv4} from 'uuid'

const Companies = () => {

  const {data: companies, error, isError, isLoading } = useQuery({queryKey: ['companies'], queryFn: companyService.getAllCompany}) 
  const deleteSkillMutation = useMutation({mutationFn: (id)=> companyService.deleteCompany(id), mutationKey: `delete-company-${uuidv4()}`})
  return (
    <>

    {
      isLoading ?
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '200px' }}>
        <CircularProgress />
     </Box>
      :
      <div className="listContainer">
            <DatatableTemplate dataRows={companies?.data?.data} columns={companyColumns} deleteMutation={deleteSkillMutation}
                                actionColumn={companyActionColumn}/>
      </div>}
    </>

  )
}

export default Companies