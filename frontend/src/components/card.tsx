interface cardTypes {
  title: string;
  snippet: string;
  description: string;
  imageUrl: string;
  price: number;
}

//"https://jojo-news.com/wp-content/uploads/2021/07/JJLEnding-1024x576.png"

export default function Product(props: cardTypes) {
  return (
    <div className="card w-96 glass">
      <figure>
        <img className="card-img-top" src={props.imageUrl} alt="image!" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.snippet}</p>
        <div className="card-actions justify-end px-4 py-4">
          <h2>{props.price}</h2>
        </div>
      </div>
    </div>
  );
}
