import React from "react";
import SpaceComponent from "../components/SpaceComponent";
import { useGetAboutUsQuery } from "../data/aboutUsSlice";



const AboutUsPage = () => {
  const {data} = useGetAboutUsQuery();
  console.log('-+about us+- ', data)
  return (
    <div className="about-us-page w-full flex flex-col items-center">
      <div className="space-compoenent-container w-full">
        <SpaceComponent />
      </div>
      <div className="about-us-page-inner-container py-5">
        <p className="">
          <div className="relative image-container w-[90%] lg:w-[70%] aspect-[4/2] mx-auto lg:float-end pb-5 lg:ps-3 lg:pb-3">
            <img className="object-fit" src="images/pic-1.jpg" alt="" />
            <div className="about-us-page-image-title w-[90%] absolute bottom-0 left-0 mb-[50px] ms-[30px] p-1 md:p-2 lg:p-4">
              <div className="about-us-page-image-title-inner  text-white relative">
                <h1 className="w-fit mb-3 px-2 pb-1 text-2xl font-bold bg-black">
                  დიზაინ ლაბი
                </h1>
                <p className="bg-black w-fit px-2 pb-1 mr-5">
                  პროფერიონალ არქიტექტორ-დიზაინერების სივრცე
                </p>
              </div>
            </div>
          </div>
          <strong>„დიზაინ ლაბი“</strong> პირველი პროფესიული სივრცეა
          დიზაინერებისთვის, რომელიც საქართველოს დიზაინერთა კავშირის ინიციატივით
          შეიქმნა. <br />
          <br />
          დღეს როდესაც, არაერთი დიზაინერი სხვადასხვა სირთულის გამოწვევის
          წინაშეა, მნიშვნელოვანია არსებობდეს სივრცე, რომელიც შექმნის და იზრუნებს
          ამ ადამიანების პროფესიულ საქმიანობაზე მორგებულ სერვისებს.
          <br />
          <br />
          <strong className="text-xl">პროექტის შესახებ</strong>
          <br />
          <p className="pt-3">
            <strong>„დიზაინ ლაბის“</strong> ვებ და სოციალური გვერდები აერთიანებს
            საქართველოში დასაქმებულ პროფესიონალ არქიტექტორ-დიზაინერებს.
            პლატფორმა ქმნის შესაძლებლობას, რომ საიტის გამოყენებით არქიტექტორმა
            და დიზაინერმა მიიღოს დაკვეთა მომხმარებლისგან. დამკვეთისთვის
            მნიშვნელოვანია რეკომენდაცია და პროფესიონალიზმი, როდესაც საქმე
            დიაზინერს თუ არქიტექტორს ეხება. ლაბთან თქვენი პარტნიორობა თავისთავად
            მნიშვნელოვანი ფაქტორია პოტენციური დამკვეთისათვის.
          </p>
          <br />
          <br />{" "}
          <strong className="text-xl">თქვენთვის ხელმისაწვდომი ხდება:</strong>
          <br></br>
          <ul className="list-disc  pt-3">
            {" "}
            <li className="ms-4">
              კეთილმოწყობილი და სრულად აღჭურვილი სივრცე, რომელიც პერიოდულად
              სხვადასხვა შეხვედრებსა და პროექტებს უმასპინძლებს.
            </li>{" "}
            <li className="ms-4">
              სივრცეში წარმდოგენილ სხვადასხვა წამყვანი პარტნიორი კომპანიასთან
              თანამშრომლობა
            </li>{" "}
            <li className="ms-4">
              სივრცეში გამართულ პრეზენტაციებსა და მასტერკლასებზე დასწრება,
              რომლებსაც ლაბის პარტნიორი კომპანიები გამართავენ.
            </li>{" "}
            <li className="ms-4">
              საერთაშორისო გამოფენებზე ვიზიტების დაორგანიზება.
            </li>
            <li className="ms-4">საერთო სამუშაო სივრცით სარგებლობა.</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
