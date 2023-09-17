import Swal from 'sweetalert2'

export const errorAlert = (err?: any) => {
    const error = `${err}`
    
    Swal.fire({
        title: err ? error.replace('ApolloError:', '') : 'Something went wrong!',
        icon: 'error',
        confirmButtonColor: '#81736B',
        customClass: {
            popup: 'error_alert',
            confirmButton: 'error_button'
        }
    })
}

export const successAlert = (title: string) => {
    Swal.fire({
        title,
        icon: 'success',
        confirmButtonColor: '#81736B',
        background: '#171818',
        color: '#ffffff',
        customClass: {
            confirmButton: 'error_button'
        }
    })
}