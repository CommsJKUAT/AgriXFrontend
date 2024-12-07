import DashboardNav from "../../../@Dashboard/nav";

const Gallery = () => {
  return (
    <>
      <DashboardNav />
      {/* images */}

      <div className="pt-16 md:pt-10">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 md:p-16">
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="/pictureperfect1.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="/pictureperfect2.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="/pictureperfect3.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="/pictureperfect4.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="/pictureperfect5.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="/pictureperfect6.jpg"
              alt=""
            />
          </div>
         
        
        </div>
      </div>
    </>
  );
};

export default Gallery;
