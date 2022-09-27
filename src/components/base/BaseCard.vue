<template>
	<div class="base__card">
		<div class="base__card-info">
			<h3><slot name="header"></slot></h3>
			<slot></slot>
		</div>
		<p><slot name="text"></slot></p>
	</div>
</template>

<script>
export default {
	name: "BaseCard",
	components: {},
};
</script>

<style lang="scss">
.base__card {
	border-radius: 4px;
	background: #fff;
	box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
	transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12), 0.3s box-shadow, 0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
	padding: 14px 80px 18px 36px;
	cursor: pointer;
	margin-bottom: toRem(20);
	position: relative;
	overflow: hidden;

	&::after {
		content: "";
		position: absolute;
		right: -4%;
		font-size: toRem(220);
		color: $color-primary;
		top: 50%;
		transform: translate(0, -50%);
		z-index: 1;
		font-family: Roboto, Arial, sans-serif;
	}

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
	}

	h3 {
		font-weight: $bold;
	}

	&-info {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	p {
		text-transform: uppercase;
		font-style: italic;
	}
}

.card__link {
	margin-left: toRem(10);
	text-decoration: none;
	font-size: toRem(14);
	text-transform: uppercase;
	background: $color-primary;
	padding: toRem(8) toRem(20);
	border-radius: toRem(25);
	color: $color-white;
	transition: color 0.2s ease-in-out;
	text-align: center;

	&:hover {
		color: $color-text;
	}
}

@media (max-width: 576px) {
	.base__card {
		padding: 10px;

		&-info {
			flex-direction: column;
		}

		h3,
		p {
			text-align: center;
		}
	}
}
</style>
