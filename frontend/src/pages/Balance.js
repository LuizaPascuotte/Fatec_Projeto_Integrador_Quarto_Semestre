import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  } from "mdb-react-ui-kit";
  import {React, useState, useEffect} from "react";
  import 'mdb-react-ui-kit/dist/css/mdb.min.css';
  // import GenericProduct from "../assets/images/icons/generic_product.avif"
  import BalanceOccurrence from "../components/BalanceOccurrence"
  import BalanceOccurrenceSmall from "../components/BalanceOccurrenceSmall"
  import Logo from '../assets/logo.png';
  import SearchSection from '../layout/MainLayout/Header/SearchSection/index';
  import SearchMaterial from '../layout/MainLayout/Header/SearchSection/SearchMaterial';
  // import * as BackRequests from '../hooks/BackRequests';
  import HandleMaterials from '../hooks/BackRequests';


function Balance() {

  const [materialComponents, setMaterialComponents] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isComponentMounted) {
        // Call HandleMaterials on the initial render
        setIsComponentMounted(true);
        await HandleMaterials({ setMaterialComponents, value: ''});
      } else if (searchResult !== null) {
        await HandleMaterials({ setMaterialComponents, value: searchResult });
      }
    };

    fetchData();
  }, [isComponentMounted, searchResult]);

  console.log('searchResult', searchResult)
  const updateSearchResult = (result) => {
    setSearchResult(result);
  }
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const res = await BackRequests.getSpecificMaterials(result);
  
  
  //         if (res) {
  //           const components = res.map((materialOccurrence, key) => (
  //             <BalanceOccurrence
  //               key={key}
  //               name={materialOccurrence.name}
  //               price={materialOccurrence.price}
  //               mesure="0"
  //               mesure_unity={materialOccurrence.mesure_unity}
  //             />
  
  //           ));
  //           console.log('Material components:', components); 
  //           setMaterialComponents(components);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching materials:', error);
  //       }
  //     };
  
  //     fetchData(); // Call the function to fetch data when the component mounts
  //   }, []); // Empty dependency array ensures this effect runs once on mount
  // };

  return (
  <section className="h-85 h-custom" style={{ backgroundColor: "#eee" }}>
    <MDBContainer className="py-3 h-80">
      <MDBRow className="justify-content-center align-items-center h-80">
        <MDBCol>
          <MDBCard>
            <MDBCardBody className="p-2">
              <MDBRow>
                <MDBCol lg="7" style={{ overflowY: 'auto', maxHeight: '500px' }}>
                  <MDBTypography tag="h5">
                    {/* <a href="#!" className="text-body">
                      <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                      shopping
                    </a> */}
                    <SearchMaterial onUpdateValue={updateSearchResult}/>
                  </MDBTypography>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <p className="mb-1">Balança atual</p>
                      <p className="mb-0">Há x items na balança desse cliente</p>
                    </div>
                    <div>
                      <p>
                        <span className="text-muted">Busca por:</span>
                        <a href="#!" className="text-body">
                          Preço
                          <MDBIcon fas icon="angle-down mt-1" />
                        </a>
                      </p>
                    </div>
                  </div>
                {/* <HandleMaterials setMaterialComponents={setMaterialComponents} onUpdateSearchResult={UpdateMaterials}/> */}
                  {materialComponents}
                </MDBCol>
  
                <MDBCol lg="5">
                  <MDBCard className="bg-primary text-white rounded-3" style={{ backgroundColor: '#ff57666' }}> 
                    <MDBCardBody>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <MDBTypography tag="h5" className="mb-0">
                          Detalhes da Balança
                        </MDBTypography>
                        <MDBCardImage src={Logo}
                          fluid className="rounded-3" style={{ width: "45px" }} alt="Avatar" />
                      </div>
  
                      <p className="small">Items pesados: </p>

                      <MDBCol lg="12" style={{ overflowY: 'auto', maxHeight: '200px' }}>
                          <BalanceOccurrenceSmall 
                          name="Material Reciclável"
                          mesure="2"
                          price="9"
                          mesure_unity="KG"
                        />
                          <BalanceOccurrenceSmall 
                          name="Material Reciclável"
                          mesure="2"
                          price="9"
                          mesure_unity="KG"
                        />
                          <BalanceOccurrenceSmall 
                          name="Material Reciclável"
                          mesure="2"
                          price="9"
                          mesure_unity="KG"
                        />
                          <BalanceOccurrenceSmall 
                          name="Material Reciclável"
                          mesure="2"
                          price="9"
                          mesure_unity="KG"
                        />
                          <BalanceOccurrenceSmall 
                          name="Material Reciclável"
                          mesure="2"
                          price="9"
                          mesure_unity="KG"
                        />
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-visa fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-amex fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                        </a>
                      </MDBCol>
                      <hr />
  
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Subtotal</p>
                        <p className="mb-2">R$ 180.00</p>
                      </div>
  
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Impostos </p>
                        <p className="mb-2">- R$ 20.00</p>
                      </div>
  
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Total</p>
                        <p className="mb-2">R$ 160.00</p>
                      </div>
  
                      <MDBBtn color="info" block size="lg">
                        <div className="d-flex justify-content-between">
                          <span>$4818.00</span>
                          <span>
                            Fechar {" "}
                            <i className="fas fa-long-arrow-alt-right ms-2"></i>
                          </span>
                        </div>
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
  );
};


export default Balance;