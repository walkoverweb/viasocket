import axios from 'axios';

export default async function getCombos(pageInfo) {
  if (pageInfo?.appone) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pageInfo?.appone}${pageInfo?.apptwo && pageInfo?.apptwo != null ? `&service=${pageInfo.apptwo}` : ''}`,
      );
      const responseData = await response.data;
      return responseData;
    } catch (error) {
      console.error('Error fetching combos:', error);
      return null;
    }
  }
}
