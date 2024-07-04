import axios from 'axios';
export const fetchPrice = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const { data } = response;
    return data;
  } catch (error) {
    // console.error('Error fetching ETH price:', error);
    return null;
  }
};