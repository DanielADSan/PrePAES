import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { Speed, BarChart, Star, Lock, ArrowForward } from '@mui/icons-material';
const CardsInfoFase = ({ fase }) => {
    const iconStyle = {
        fontSize: '40px',
        color: 'rgb(236, 180, 27)', // Puedes cambiar el color aquí
      };
      
    return (
        <>
        <Grid container spacing={5} className='promedios-fase'>
      {/* Tarjeta 1 */}
      <Grid item xs={12} sm={4}>
        <Card className='cardStylePromedio'>
          <Speed style={iconStyle} />
          <CardContent  style={{textAlign:'center'}}> 
            <Typography variant="h6" gutterBottom style={{textAlign:'center'}}> 
              Promedio de tiempo por respuesta
            </Typography>
            <Typography variant="h4">6.8 segundos</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Tarjeta 2 */}
      <Grid item xs={12} sm={4}>
        <Card  className='cardStylePromedio'>
          <BarChart style={iconStyle} />
          <CardContent  style={{textAlign:'center'}}>
            <Typography variant="h6" gutterBottom >
              Categoría a reforzar
            </Typography>
            <Typography variant="h4">Geometría</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Tarjeta 3 */}
      <Grid item xs={12} sm={4}>
        <Card  className='cardStylePromedio'>
          <Star style={iconStyle} />
          <CardContent  style={{textAlign:'center'}}>
            <Typography variant="h6" gutterBottom>
              Promedio ensayo 1
            </Typography>
            <Typography variant="h4">4.5</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
        </>
    );
};
    
export default CardsInfoFase;