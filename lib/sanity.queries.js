export const WORK_QUERY = `
*[_type == "work"] | order(number asc){
  _id,
  title,
  mark,
  year,
  category,

  heroMedia{
  image{
    asset->{
      url,
      metadata { lqip }
      }
    },
  }, 
  heroMedia2{
  image{
    asset->{
      url,
      metadata { lqip }
      }
    },
  },
  sections[]{
  ...,
    image{
      asset->{
        url,
        metadata { lqip }
      }
    }
  }
}
`;
