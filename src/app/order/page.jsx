// pages/order.jsx
"use client";

export default function Order() {

  const foods = [
    {
      name: "かつ丼",
      img: "/foods/katsudon.jpg",
      price: 850
    },
    {
      name: "うどん",
      img: "/foods/udon.jpg",
      price: 600
    },
    {
      name: "ラーメン",
      img: "/foods/ramen.jpg",
      price: 750
    },
    {
      name: "焼肉定食",
      img: "/foods/yakiniku.jpg",
      price: 980
    }
  ];

  const handleOrder = (name) => {
    alert(`${name} を注文しました！`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #e0eaff 0%, #ffffff 100%)",
      fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>

      <h1 style={{
        fontSize: "2.2rem",
        fontWeight: "700",
        color: "#326dfa",
        marginBottom: "1.2rem",
        letterSpacing: ".03em",
        textShadow: "0 1px 2px rgba(0,0,0,0.08)"
      }}>
        注文メニュー
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.6rem",
        width: "100%",
        maxWidth: "1000px",
      }}>
        {foods.map(food => (
          <div key={food.name} style={{
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 6px 24px rgba(50,109,250,0.10)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}>

            {/* 写真 */}
            <img
              src={food.img}
              alt={food.name}
              style={{
                width: "100%",
                height: "170px",
                objectFit: "cover",
              }}
            />

            {/* 商品名・ボタン */}
            <div style={{
              padding: "1.1rem",
              display: "flex",
              flexDirection: "column",
              gap: ".7rem"
            }}>
              <div style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#264dbd"
              }}>
                {food.name}
              </div>

              <div style={{
                fontSize: "1.1rem",
                color: "#4752a5",
                marginBottom: "0.4rem"
              }}>
                ¥{food.price}
              </div>

              <button
                onClick={() => handleOrder(food.name)}
                style={{
                  padding: "0.8rem",
                  background: "linear-gradient(87deg, #326dfa 0%, #5a98f9 90%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontWeight: 700,
                  letterSpacing: ".02em",
                  cursor: "pointer",
                  boxShadow: "0 1.5px 8px rgba(50,109,250,.13)",
                  transition: "0.22s"
                }}
                onMouseOver={(e) =>
                  e.target.style.background = "linear-gradient(87deg, #2b59c3 0%, #326dfa 90%)"
                }
                onMouseOut={(e) =>
                  e.target.style.background = "linear-gradient(87deg, #326dfa 0%, #5a98f9 90%)"
                }
              >
                注文する
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
