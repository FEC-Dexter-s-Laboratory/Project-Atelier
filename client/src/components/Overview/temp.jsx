<ImageContainer>
  <ThumbUpArrow id="thumbUpArrow" onMouseEnter={enterThumb} onMouseLeave={leaveThumb} onClick={thumbUp}> 🔼 </ThumbUpArrow>
  <ThumbDiv>
    {
      styles.map((style, index) => {
        stylesRowCounter += 1;
        stylesColCounter = 1;
        if (stylesRowCounter === 5) {
          thumbDisplay = 'none';
        }
        return (
          <div key={index} style={{gridColumn: stylesColCounter, gridRow: stylesRowCounter, display: thumbDisplay, justifyContent: 'end', alignItems: 'center'}} id={`${style.id}thumbDiv`}>
            <img
              style={{height: '100px', width: '100px', position: 'absolute', zIndex: '12', border: '1px solid black', float: 'right', border: index === 0 ? '4px solid white' : null, transition: '.2s'}}
              src={style.srcThumb}
              className={style.id}
              id={`${style.id}thumb`}
              onClick={displayThumb} />
          </div>
        );
      })
    }
  </ThumbDiv>
  <ThumbDownArrow id="thumbDownArrow" onMouseEnter={enterThumb} onMouseLeave={leaveThumb} onClick={thumbDown}> 🔽 </ThumbDownArrow>
  <MainImage src={mainImage} alt="style" />
</ImageContainer>







<Price>
  {
    !isOnSale ? <h4>{`$${originalPrice}`}</h4> : (
      <>
        <h4 style={{textDecoration: 'line-through'}}>{`$${originalPrice}`}</h4>
        <h4 style={{color: 'red'}}>{`Now only $${salePrice}!`}</h4>
      </>
    )
  }
</Price>





<ReviewsDiv>
  <StarDisplay rating={rating} style={{gridColumn: '1'}} />
  <ReadReviewsLink href="#reviews-module">Read All Reviews</ReadReviewsLink>
</ReviewsDiv>






<ChooseStyle>
  {
    styleResults.map((style, index) => {
      checkStyleIndex += 1;
      styleResultsColCounter += 1;
      if (styleResultsColCounter > 4) {
        styleResultsColCounter = 1;
        styleResultsRowCounter += 1;
      }
      if (index === 0) {
        checkStyle = 'block';
      } else {
        checkStyle = 'none';
      }
      return (
        <div key={style.style_id} style={{gridColumn: styleResultsColCounter, gridRow: styleResultsRowCounter, margin: '4%', position: 'relative', width: 'fit-content'}} onClick={(event) => changeStyle(style.style_id)} className={style.style_id}>
          <img className={style.style_id} src={style.photos[0].thumbnail_url} style={{borderRadius: '50%', width: '80px', height: '80px'}}
            onMouseEnter={enterThumb} onMouseLeave={leaveThumb} />
          <img src="https://media.istockphoto.com/vectors/check-vector-id871478670?b=1&k=20&m=871478670&s=170667a&w=0&h=z-dZAr0bn8-IlGirxjJjqJcATVZWsHHr8UgEKxl1gtg=" style={{position: 'absolute', top: '0', right: '0', width: '30px', height: '30px', zIndex: '30', borderRadius: '50%', display: checkStyle}} id={style.style_id} />
        </div>
      );
    })
  }
</ChooseStyle>






<DropdownDiv>
  <SelectSize onChange={checkSkus}>
    <option>Select Size</option>
    <option>XS</option>
    <option>S</option>
    <option>M</option>
    <option>L</option>
    <option>XL</option>
    <option>XXL</option>
  </SelectSize>
  <SelectQuantity onChange={chooseQuantity}>
    {
      qList.map((q, index) => {
        return (
          <option key={index}>{q}</option>
        );
      })
    }
  </SelectQuantity>
  <AddToCart onClick={addToCart}>{!inCart ? 'Add To Cart ➕ ' : 'Added To Cart ✅ '}</AddToCart>
  <Favorite onClick={toggleLike}>{!isLiked ? '  ⭐  ' : '  ❤️  '}</Favorite>
</DropdownDiv>







let xlCount = 0;
let total = 0;
for (let i = 0; i < qs.length; i++) {
  if (qs[i].size === 'XS') {
    setXsQuantity(qs[i].quantity);
    total += qs[i].quantity;
  } else if (qs[i].size === 'S') {
    setSQuantity(qs[i].quantity);
    total += qs[i].quantity;
  } else if (qs[i].size === 'M') {
    setMQuantity(qs[i].quantity);
    total += qs[i].quantity;
  } else if (qs[i].size === 'L') {
    setLQuantity(qs[i].quantity);
    total += qs[i].quantity;
  } else if (qs[i].size === 'XL') {
    if (xlCount > 0) {
      console.log('second xl caught');
      setXxlQuantity(qs[i].quantity);
      total += qs[i].quantity;
    } else {
      xlCount += 1;
      setXlQuantity(qs[i].quantity);
      total += qs[i].quantity;
    }
  } else if (qs[i].size === 'XXL') {
    setXxlQuantity(qs[i].quantity);
    total += qs[i].quantity;
  }
}
setTotalQuantities(total);







if (e.target.value === 'XS') {
  if (xsQuantity >= 15) {
    for (let i = 1; i <= 15; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  } else {
    for (let i = 1; i <= xsQuantity; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  }
} else if (e.target.value === 'S') {
  if (sQuantity >= 15) {
    for (let i = 1; i <= 15; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  } else {
    for (let i = 1; i <= sQuantity; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  }
} else if (e.target.value === 'M') {
  if (mQuantity >= 15) {
    for (let i = 1; i <= 15; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  } else {
    for (let i = 1; i <= mQuantity; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  }
} else if (e.target.value === 'L') {
  if (lQuantity >= 15) {
    for (let i = 1; i <= 15; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  } else {
    for (let i = 1; i <= lQuantity; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  }
} else if (e.target.value === 'XL') {
  if (xlQuantity >= 15) {
    for (let i = 1; i <= 15; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  } else {
    for (let i = 1; i <= xlQuantity; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  }
} else if (e.target.value === 'XXL') {
  if (xxlQuantity >= 15) {
    for (let i = 1; i <= 15; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  } else {
    for (let i = 1; i <= xxlQuantity; i++) {
      q.push(i);
    }
    setQList(q);
    setSelectedSize(e.target.value);
    document.getElementById('pleaseSelectSizeDiv').style.display = 'none';
    return;
  }
}







<option>XS</option>
<option>S</option>
<option>M</option>
<option>L</option>
<option>XL</option>
<option>XXL</option>









let skus = styleResults[i].skus;
for (const sku in skus) {
  if (skus[sku].size === 'XS') {
    setXsQuantity(skus[sku].quantity);
  } else if (skus[sku].size === 'S') {
    setSQuantity(skus[sku].quantity);
  } else if (skus[sku].size === 'M') {
    setMQuantity(skus[sku].quantity);
  } else if (skus[sku].size === 'L') {
    setLQuantity(skus[sku].quantity);
  } else if (skus[sku].size === 'XL') {
    if (xlCount > 0) {
      setXxlQuantity(skus[sku].quantity);
    } else {
      xlCount += 1;
      setXlQuantity(skus[sku].quantity);
    }
  } else if (skus[sku].size === 'XXL') {

    setXxlQuantity(skus[sku].quantity);
  }
}