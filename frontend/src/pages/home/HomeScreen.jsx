import React from 'react'
import Navbar from './../../components/Navbar';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';
import useGetTrendingContent from '../../hooks/useGetTrendingContent';
import { ORIGINAL_IMG_BASE_URL,MOVIE_CATEGORIES,TV_CATEGORIES } from '../../utils/constants';

import { useContentStore } from '../../store/content';
import MovieSlider from '../../components/MovieSlider';



const HomeScreen = () => {

	const {trendingContent} =useGetTrendingContent()
	console.log(trendingContent);

	const {contentType} = useContentStore();



	if (!trendingContent)
		return (
			<div className='h-screen text-white relative'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
			</div>
		);




  return (
	<>
	<div className='relative h-screen text-white'>
		<Navbar/>
		<img src={ORIGINAL_IMG_BASE_URL+  trendingContent?.backdrop_path } alt="heroimg"  
		className='absolute top-0 left-0 w-full h-full object-cover -z-50 '/>
		<div className='absolute top-0 left-0 w-full h-full -z-50  bg-black/50 '/>



<div className='w-full h-full flex flex-col justify-center top-0 left-0 absolute px-30 '>



	<div className='  max-w-2xl '>
		<h1 className='mt-4 text-6xl font-extrabold'>{ trendingContent?.title || trendingContent?.name    }</h1>
		<p className='mt-2 text-lg'>{trendingContent?.release_date?.split("-")[0] ||
								trendingContent?.first_air_date.split("-")[0]}{" "}
							| {trendingContent?.adult ? "18+" : "PG-13"}</p>
		<p>{trendingContent?.overview.length > 200
								? trendingContent?.overview.slice(0, 200) + "..."
								: trendingContent?.overview}</p>
	</div>

	<div className='flex mt-8 '>
		<Link to={`/watch/${trendingContent?.id}`}
  className='bg-white text-black py-2 px-4 rounded-md  font-bold flex items-center hover:bg-gray-300 '>
		<Play className='size-6  mr-2 fill-black'/>
		play
		</Link>
			<Link to={`/watch/${trendingContent?.id}`}
 className='ml-2 bg-gray-500 text-white py-2 px-4 rounded-md  font-bold flex items-center hover:bg-gray-300 '>
		<Info className='size-6  mr-2 '/>
		more info
		</Link>


	</div>

</div>






	</div>





	<div className='bg-black flex flex-col gap-10 py-10'>
			{contentType === "movie"
					? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
					: TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}


	</div>

	</>
  )
}

export default HomeScreen