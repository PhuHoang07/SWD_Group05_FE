import axiosClient from "./axios/config";

export const sendOtp = async (email) => {
 
    try{
         const respone = await axiosClient.post('/api/otp-management/send', {
        email,
        subject: 'ForgotPassword',
  });
  return respone.data;
    }catch(e){
        throw e.respone.data;
    }
    
};

export const verifyOtp = async (email, otp) => {
    try{
  const respone1= await axiosClient.post('/api/otp-management/verify', {
    email,
    otp,
  });
    }catch(e){
        throw e.respone.data;
    }

};

export const resetPassword = async(email, newPassword, confirmPassword) => {
    try{
const respone2 = await axiosClient.post('/api/auth/password/reset', {
    email,
    newPassword,
    confirmPassword,
  });
  return respone2.data;
    }catch(e){
        throw e.respone.data;
    }
  
};
