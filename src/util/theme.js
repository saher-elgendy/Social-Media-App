export default {
  palette: {
    primary: {
      light: '#039be5',
      main: '#01579b',
      dark: '#b22a00',
      contrastText: '#fff'
    },
    secondary: {
      main: '#f50057',
      contrastText: '#fff'
    }
  },
  spread: {
    typography: {
      userNextVariants: true
    },
    form: {
      textAlign: 'center',
    },
    img: {
      maxWidth: 60,
      margin: '1.5rem auto 5px'
    },
    textField: {
      margin: 20
    },
    button: {
      marginTop: 16,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      width: 90,
      height: 50
    },
    customError: {
      color: '#FF0000',
      fontSize: '0.7rem'
    },
    small: {
      display: 'block',
      marginTop: '1rem'
    },
    circularProgress: {
      color: '#fff',
      position: 'absolute'
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }
}